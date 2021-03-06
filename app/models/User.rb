# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze

  enum role: { standard: 0, administrator: 1 }
  has_secure_password
  has_secure_token :authentication_token

  has_many :quizzes
  has_many :attempts, dependent: :destroy

  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: VALID_EMAIL_REGEX }
  validates :last_name, presence: true, length: { maximum: Constants::MAX_USER_NAME_LENGTH }
  validates :first_name, presence: true, length: { maximum: Constants::MAX_USER_NAME_LENGTH }
  validates :password, length: { minimum: 6 }, if: -> { password.present? }
  validates :password_confirmation, length: { minimum: 6 }, presence: true, on: :create

  before_save :to_lower_case
  accepts_nested_attributes_for :attempts

  private

    def to_lower_case
      email.downcase!
    end
end
