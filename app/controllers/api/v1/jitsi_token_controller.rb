# frozen_string_literal: true

class Api::V1::JitsiTokenController < Api::V1::BaseController
  skip_before_action :authenticate_user!, only: [:create]
  skip_before_action :authenticate_user_using_x_auth_token, only: [:create]

  before_action :set_user, only: [:create]

  def create
    if @user
      token = JitsiTokenService.new({ id: @user.id, name: @user.full_name, email: @user.email, moderator: "true" }).generate
      render json: { token: token, room: room_name }, status: :ok
    else
      token = JitsiTokenService.new({ id: token_params[:id], name: token_params[:name], moderator: "false" }).generate
      ask_permission_to_join_call
      render json: { token: token, room: room_name }, status: :ok
    end
  end

  private

    def set_user
      @user = User.find_by(email: token_params[:email])
    end

    def token_params
      params.require(:token).permit(:email, :name, :room_name, :id, :timestamp)
    end

    def ask_permission_to_join_call
      ActionCable.server.broadcast("session_approval_channel_#{token_params[:room_name]}", { participant_name: token_params[:name], participant_room: token_params[:id], timestamp: token_params[:timestamp] })
    end

    def room_name
      if @user
        Rails.application.secrets.jitsi[:application_id] + "/" + @user.room_name
      else
        Rails.application.secrets.jitsi[:application_id] + "/" + token_params[:room_name]
      end
    end
end
