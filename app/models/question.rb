# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy
  has_many :attempt_answer, dependent: :destroy

  accepts_nested_attributes_for :options, allow_destroy: true
  validates :value, presence: true
  validates_associated :options
end
