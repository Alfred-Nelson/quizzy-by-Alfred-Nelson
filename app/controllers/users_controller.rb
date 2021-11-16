# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    @user = User.find_by(email: user_params[:email])
    if @user
      if @user.update(user_params)
        render status: :ok, json: { notice: "YAAAAy" }
      else
        render status: :unprocessable_entity, json: { error: "NOOOOOOO" }
      end
    else
      @user = User.new(user_params.merge(password: "welcome", password_confirmation: "welcome"))
      if @user.save
        render status: :ok, json: { notice: "yAAAy" }
      else
        render status: :unprocessable_entity, json: { notice: "nooooooo" }
      end
    end
  end

  private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, attempts_attributes: [ :quiz_id, :submitted ])
    end
end
