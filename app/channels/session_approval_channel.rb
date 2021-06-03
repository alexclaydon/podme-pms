# frozen_string_literal: true

class SessionApprovalChannel < ApplicationCable::Channel
  def subscribed
    stream_from "session_approval_channel_#{params[:room_id]}"
  end

  def admit_participant(data)
    ActionCable.server.broadcast "session_approval_channel_#{data["participant_room"]}", { permission_granted: data["permission_granted"] }
  end

  def practitioner_left(data)
    ActionCable.server.broadcast "conference_state_channel_#{data["practitioner_room_name"]}", { practitioner_left: data["practitioner_left"], practitioner_room_name: data["practitioner_room_name"] }
  end

  def unsubscribed
  end
end
