# frozen_string_literal: true

class ConferenceStateChannel < ApplicationCable::Channel
  def subscribed
    stream_from "conference_state_channel_#{params[:room_id]}"
  end

  def unsubscribed
  end
end
