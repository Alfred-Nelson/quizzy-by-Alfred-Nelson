# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options
  accepts_nested_attributes_for :options
  validates :value, presence: true
  validates_associated :options
end
