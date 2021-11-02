class User < ApplicationRecord
    VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze

    validates :email, presence: true,
                    uniqueness: true,
                    format: {with: VALID_EMAIL_REGEX}
    validates :last_name, presence: true, 
                        length: { maximum: Constants::MAX_USER_NAME_LENGTH }
    validates :first_name, presence: true

    before_save :to_lower_case

    private

        def to_lower_case
            email.downcase!
        end
end
