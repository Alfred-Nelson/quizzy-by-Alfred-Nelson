# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def authenticate_user_using_x_auth_token
    user_email = request.headers["X-Auth-Email"]
    auth_token = request.headers["X-Auth-Token"].presence
    user = user_email && User.find_by_email(user_email)

    if user && auth_token &&
      ActiveSupport::SecurityUtils.secure_compare(
        user.authentication_token, auth_token
      )
      if user.role == "administrator"
        @current_user = user
      else
        render status: :unauthorized, json: { error: t("not_admin") }
      end
    else
      render status: :unauthorized, json: { error: t("session.could_not_auth") }
    end
  end

  private

    def current_user
      @current_user
    end

    def handle_authorization_error
      render status: :forbidden, json: { error: t("authorization.denied") }
    end
end
