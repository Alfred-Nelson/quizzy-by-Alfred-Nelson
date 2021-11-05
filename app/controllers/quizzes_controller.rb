# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token

  def create
    @quizzes = Quiz.new(quiz_params.merge(user_id: @current_user.id))
    if @quizzes.save
      render status: :ok, json: { notice: t("quiz.create_success") }
    else
      render status: :unprocessable_entity, json: { error: @quizzes.errors.full_messages }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name)
    end
end
