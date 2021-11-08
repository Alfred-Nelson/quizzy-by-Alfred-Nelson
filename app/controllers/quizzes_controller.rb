# frozen_string_literal: true

class QuizzesController < ApplicationController
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index
  before_action :authenticate_user_using_x_auth_token

  def index
    @quiz = policy_scope(Quiz)
  end

  def create
    @quizzes = Quiz.new(quiz_params.merge(user_id: @current_user.id))
    authorize @quizzes
    if @quizzes.save
      render status: :ok, json: { notice: t("quiz.create_success") }
    else
      render status: :unprocessable_entity, json: { error: @quizzes.errors.full_messages }
    end
  end

  def update
    @quizzes = Quiz.find_by(id: params[:id])
    puts @quizzes
    puts params[:id]
    authorize @quizzes
    if @quizzes.update(quiz_params)
      render status: :ok, json: { notice: t("quiz.update_success") }
    else
      render status: :unprocessable_entity, json: { error: @quizzes.errors.full_messages }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name)
    end
end
