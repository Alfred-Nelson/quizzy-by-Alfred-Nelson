# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quizzes, only: %i[destroy update show]

  def index
    @quizzes = @current_user.quizzes.order("updated_at DESC")
  end

  def create
    @quiz = @current_user.quizzes.new(quiz_params)
    if @quiz.save
      render status: :ok, json: { notice: t("create_success", entity: "Quiz") }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages }
    end
  end

  def update
    if @quiz.update(quiz_params)
      render status: :ok, json: { notice: t("quiz.update_success") }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages }
    end
  end

  def show
    unless @quiz
      render status: :not_found, json: { error: @quiz.errors.full_messages }
    end
  end

  def destroy
    if @quiz.destroy
      render status: :ok, json: { notice: t("quiz.destroy_success") }
    else
      render status: :unprocessable_entity, json: { notice: @quiz.errors.full_messages }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name)
    end

    def load_quizzes
      @quiz = @current_user.quizzes.find_by(id: params[:id])
    end
end
