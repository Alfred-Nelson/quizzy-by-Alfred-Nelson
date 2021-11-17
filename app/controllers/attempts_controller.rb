# frozen_string_literal: true

class AttemptsController < ApplicationController
  def update
    attempted_answers_array = get_orginal_attempt_answer_array
    puts params[:id]
    @attempt = Attempt.find_by(id: params[:id])
    if @attempt.update(submitted: attempt_params[:submitted], attempt_answers_attributes: attempted_answers_array)
      render status: :ok, json: { notice: "Successfully submitted the quiz" }
    else
      render status: :unprocessable_entity, json: { error: @attempt.errors.full_messages }
    end
  end

  private

    def attempt_params
      params.require(:attempt).permit(:submitted, attempt_answers_attributes: [:question_id, :marked_answer_id])
    end

    def get_correct_option(all_options)
      all_options.each do |each_option|
        return each_option.id if each_option.answer
      end
    end

    def get_orginal_attempt_answer_array
      orginal_attempted_answers_array = []
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
      end
      orginal_attempted_answers_array
    end
end
