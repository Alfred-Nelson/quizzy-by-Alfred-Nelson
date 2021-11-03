# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze

  enum role: { standard: 0, administrator: 1 }
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: VALID_EMAIL_REGEX }
  validates :last_name, presence: true, length: { maximum: Constants::MAX_USER_NAME_LENGTH }
  validates :first_name, presence: true, length: { maximum: Constants::MAX_USER_NAME_LENGTH }

  before_save :to_lower_case

  private

    def to_lower_case
      email.downcase!
    end
end
