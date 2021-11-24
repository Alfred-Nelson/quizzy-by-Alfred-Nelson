# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_question, only: %i[show update destroy]
  def create
    @question = Question.new(question_params)
    if @question.save
      render status: :ok, json: { notice: t("create_success", entity: "Question") }
    else
      render status: :unprocessable_entity, json: { error: @question.errors.full_messages }
    end
  end

  def show
    unless @question
      render status: :not_found, json: { error: @question.errors.full_messages }
    end
  end

  def update
    if @question.update(question_params)
      render status: :ok, json: { notice: t("update_success", entity: "Questions") }
    else
      render status: :unprocessable_entity, json: { error: @question.errors.full_messages }
    end
  end

  def destroy
    if @question.destroy
      render status: :ok, json: { notice: t("destroy_success", entity: "Question") }
    else
      render status: :unprocessable_entity, json: { error: @question.errors.full_messages }
    end
  end

  private

    def load_question
      @question = Question.find_by(id: params[:id])
      unless @question.quiz.user === @current_user
        render status: :unprocessable_entity, json: { error: t("authorization.denied") }
      end
    end

    def question_params
      params.require(:question).permit(:value, :quiz_id, options_attributes: [:id, :value, :answer, :_destroy])
    end
end
