# frozen_string_literal: true

class QuizzesController < ApplicationController
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quizzes, only: %i[destroy update]

  def index
    @quizzes = policy_scope(Quiz).order("updated_at DESC")
  end

  def create
    @quiz = Quiz.new(quiz_params.merge(user_id: @current_user.id))
    authorize @quiz
    if @quiz.save
      render status: :ok, json: { notice: t("quiz.create_success") }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages }
    end
  end

  def update
    authorize @quiz
    if @quiz.update(quiz_params)
      render status: :ok, json: { notice: t("quiz.update_success") }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages }
    end
  end

  def destroy
    authorize @quiz
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
      @quiz = Quiz.find_by(id: params[:id])
    end
end
