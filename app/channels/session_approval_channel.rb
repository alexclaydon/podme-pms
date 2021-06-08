# frozen_string_literal: true

class SessionApprovalChannel < ApplicationCable::Channel
  def subscribed
    stream_from "session_approval_channel_#{params[:room_id]}"
    load_practitioner if params[:role] == "practitioner"
  end

  def admit_participant(data)
    ActionCable.server.broadcast "session_approval_channel_#{data["participant_room"]}", { permission_granted: data["permission_granted"] }
  end

  def practitioner_left(data)
    @practitioner.toggle!(:is_session_live) if @practitioner.is_session_live?
    ActionCable.server.broadcast "conference_state_channel_#{data["practitioner_room_name"]}", { practitioner_left: data["practitioner_left"], practitioner_room_name: data["practitioner_room_name"] }
  end

  def practitioner_is_online(data)
    @practitioner.toggle!(:is_active) unless @practitioner.is_active?
    ActionCable.server.broadcast "conference_state_channel_#{data["practitioner_room_name"]}", { is_practitioner_online: true, practitioner_room_name: data["practitioner_room_name"] }
  end

  def practitioner_join_status(data)
    practitioner = User.find_by(room_name: data["practitioner_room_name"])
    ActionCable.server.broadcast "session_approval_channel_#{params[:room_id]}", { is_practitioner_online: practitioner.is_active?, practitioner_join_status: true, is_session_started: practitioner.is_session_live? }
  end

  def practitioner_started_session(data)
    @practitioner.toggle!(:is_session_live) unless @practitioner.is_session_live?
    ActionCable.server.broadcast "conference_state_channel_#{data["practitioner_room_name"]}", { practitioner_room_name: data["practitioner_room_name"], is_session_started: true }
  end

  def unsubscribed
    if params[:role] == "practitioner"
      @practitioner.toggle!(:is_session_live) if @practitioner.is_session_live?
      @practitioner.toggle!(:is_active) if @practitioner.is_active?
      ActionCable.server.broadcast "conference_state_channel_#{params[:room_id]}", { practitioner_left: true, practitioner_room_name: params[:room_id] }
    end
  end

  private

    def load_practitioner
      @practitioner = User.find_by(room_name: params[:room_id])
    end
end
