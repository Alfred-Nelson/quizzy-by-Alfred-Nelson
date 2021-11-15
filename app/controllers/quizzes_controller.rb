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
      render status: :ok, json: { notice: t("update_success", entity: "Quiz name") }
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
      render status: :ok, json: { notice: t("destroy_success", entity: "Quiz") }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages }
    end
  end

  def get_slug
    @quiz = Quiz.find_by(id: params[:id])
    if @quiz.slug?
      render status: :ok, json: { slug: @quiz.slug }
    elsif @quiz.update(id: @quiz.id, slug: @quiz.set_slug)
      render status: :ok, json: { slug: @quiz.slug }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages }
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
