# frozen_string_literal: true

class Api::V1::SessionsController < Api::V1::BaseController
  include Devise::Controllers::Rememberable

  skip_before_action :authenticate_user!
  skip_before_action :authenticate_user_using_x_auth_token

  def create
    user = User.find_for_database_authentication(email: params[:user] && params[:user][:email])
    if invalid_email(user)
      respond_with_error "No user found with this email", 401
    elsif invalid_password?(user)
      respond_with_error "Incorrect password", 401
    else
      params[:user][:remember_me] ? remember_me(user) : forget_me(user)
      sign_in(user)
      render json: { auth_token: user.authentication_token, user: user, is_admin: user.super_admin? },
             location: root_path, status: :created
    end
  end

  def destroy
    sign_out(@user)
    reset_session
  end

  private

    def invalid_password?(user)
      !user.valid_password?(params[:user][:password])
    end

    def invalid_email(user)
      user.blank?
    end
end
