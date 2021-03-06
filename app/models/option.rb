# frozen_string_literal: true

class Option < ApplicationRecord
  belongs_to :question
  has_many :all_correct_attempts, class_name: "AttemptAnswer", foreign_key: :correct_answer_id, dependent: :destroy
  has_many :all_marked_attempts, class_name: "AttemptAnswer", foreign_key: :marked_answer_id, dependent: :destroy
  validates :value, presence: true
end
