# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: %i[get_quiz_by_slug get_questions_by_slug standard_show]
  before_action :load_quizzes, only: %i[destroy update show]
  before_action :load_quizzes_by_slug, only: %i[get_quiz_by_slug get_questions_by_slug]

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
      render status: :not_found, json: { error: t("not_found") }
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

  def get_quiz_by_slug
    render
  end

  def get_questions_by_slug
    render
  end

  def standard_show
    @quiz = Quiz.find_by(id: params[:id])
    unless @quiz
      render status: :not_found, json: { error: t("not_found") }
    end
  end

  def generate_report
    id = GenerateReportWorker.perform_async(@current_user.id)
    render status: :ok, json: { id: id, user_id: @current_user.id }
  end

  def report_status
    status = Sidekiq::Status.get_all(params[:id])
    render status: :ok, json: { status: status }
  end

  def download_report
    id = @current_user.id
    send_file Rails.root.join("tmp", "report_#{id}.csv"), type: "application/csv", filename: "report_#{id}.csv"
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name)
    end

    def load_quizzes
      @quiz = @current_user.quizzes.find_by(id: params[:id])
    end

    def load_quizzes_by_slug
      @quiz = Quiz.find_by(slug: params[:slug])
      unless @quiz
        render status: :not_found, json: { error: t("not_found") }
      end
    end
end
