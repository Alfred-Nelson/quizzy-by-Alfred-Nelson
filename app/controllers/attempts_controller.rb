# frozen_string_literal: true

class AttemptsController < ApplicationController
  before_action :load_attempt
  def update
    attempted_answers_array, no_correct_answer = get_orginal_attempt_answer_array
    total_question_count = @attempt.quiz.questions.count
    if @attempt.update(
      submitted: attempt_params[:submitted],
      correct_answer_count: no_correct_answer,
      incorrect_answer_count: total_question_count - no_correct_answer,
      attempt_answers_attributes: attempted_answers_array
    )
      render status: :ok, json: { notice: t("submit_success") }
    else
      render status: :unprocessable_entity, json: { error: @attempt.errors.full_messages }
    end
  end

  def show
  end

  private

    def attempt_params
      params.require(:attempt).permit(:submitted, attempt_answers_attributes: [:question_id, :marked_answer_id])
    end

    def load_attempt
      @attempt = Attempt.find_by(id: params[:id])
      unless @attempt
        render status: :ok, json: { error: @attempt.errors.full_messages }
      end
    end

    def get_correct_option(all_options)
      all_options.each do |each_option|
        return each_option.id if each_option.answer
      end
    end

    def get_orginal_attempt_answer_array
      orginal_attempted_answers_array = []
      no_correct_answer = 0
      attempt_params[:attempt_answers_attributes].each do |attempted_value|
        all_options = Question.find_by(id: attempted_value[:question_id]).options
        correct_answer_option = get_correct_option(all_options)
        orginal_attempted_answers_array.push(
          {
            question_id: attempted_value[:question_id],
            marked_answer_id: attempted_value[:marked_answer_id],
            correct_answer_id: correct_answer_option
          }
        )
        if attempted_value[:marked_answer_id].to_i == correct_answer_option
          no_correct_answer = no_correct_answer + 1
        end
      end
      return orginal_attempted_answers_array, no_correct_answer
    end
end
