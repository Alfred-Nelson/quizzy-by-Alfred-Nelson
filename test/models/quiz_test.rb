# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @user = User.create(
      email: "oliver@example.com",
      first_name: "oliver",
      last_name: "twist",
      password: "charles",
      password_confirmation: "charles"
    )
    @quiz = Quiz.new(
      name: "World",
      user_id: @user.id
    )
  end

  def test_quiz_should_be_valid
    assert @quiz.valid?
  end

  def test_quiz_name_should_not_be_blank
    @quiz.name = ""
    assert_not @quiz.valid?
    assert_includes @quiz.errors.full_messages, "Name can't be blank"
  end
end
