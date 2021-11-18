# frozen_string_literal: true

class AttemptAnswer < ApplicationRecord
  belongs_to :attempt
  belongs_to :question
  belongs_to :correct_option, foreign_key: :correct_answer_id, class_name: "Option"
  belongs_to :marked_option, foreign_key: :marked_answer_id, class_name: "Option"

  validates :attempt_id, uniqueness: { scope: :question_id }
end
