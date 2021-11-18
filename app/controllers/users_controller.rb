# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    @user = User.find_by(email: user_params[:email])
    if @user
      attempted_quiz = @user.attempts.find_by(quiz_id: user_params[:attempts_attributes][0][:quiz_id])
      if attempted_quiz
        render status: :ok, json:
        {
          notice: t("login_success"),
          id: attempted_quiz.id,
          submitted: attempted_quiz.submitted
        }
      elsif @user.update(user_params)
        attempted_quiz = @user.attempts.find_by(quiz_id: user_params[:attempts_attributes][0][:quiz_id])
        render status: :ok,
          json: {
            notice: t("login_success"),
            id: attempted_quiz.id,
            submitted: false
          }
      else
        render status: :unprocessable_entity, json: { error: @user.errors.full_messages }
      end
    else
      @user = User.new(user_params.merge(password: "welcome", password_confirmation: "welcome"))
      if @user.save
        attempted_quiz = @user.attempts.find_by(quiz_id: user_params[:attempts_attributes][0][:quiz_id])
        render status: :ok, json:
          {
            notice: t("login_success"),
            id: attempted_quiz.id,
            submitted: false
          }
      else
        render status: :unprocessable_entity, json: { error: @user.errors.full_messages }
      end
    end
  end

  private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, attempts_attributes: [ :quiz_id, :submitted ])
    end
end
