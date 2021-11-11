# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  def create
    @question = Question.new(question_params)
    if @question.save
      render status: :ok, json: { notice: t("create_success", entity: "Question") }
    else
      render status: :unprocessable_entity, json: { error: @question.errors.full_messages }
    end
  end

  private

    def question_params
      params.require(:question).permit(:value, :quiz_id, options_attributes: [:value, :answer])
    end
end
