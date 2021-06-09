# frozen_string_literal: true

class ConferenceStateChannel < ApplicationCable::Channel
  def subscribed
    stream_from "conference_state_channel_#{params[:room_id]}"
  end

  def unsubscribed
    ActionCable.server.broadcast "session_approval_channel_#{params[:room_id]}", { participant_room: params[:participant_id], participant_left: true }
  end
end
