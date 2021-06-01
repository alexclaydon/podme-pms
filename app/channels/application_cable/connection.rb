# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    # identified_by :room_id

    # def connect
    #   self.room_id = params[:room_id]
    # end
  end
end
