# frozen_string_literal: true

require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
    @user = User.create(
      email: "oliver@example.com",
      first_name: "oliver",
      last_name: "twist",
      password: "charles",
      password_confirmation: "charles"
    )
    @quiz = @user.quizzes.create(name: "hello")
    @question = @quiz.questions.new(
      value: "Who is this",
      options_attributes: [
        { value: "oliver", answer: false },
        { value: "sam", answer: true }
      ]
    )
  end

  def test_question_should_be_valid
    assert @question.valid?
  end

  def test_options_should_be_valid
    @question.options.each do |option|
      assert option.valid?
    end
  end

  def test_question_value_should_not_be_blank
    @question.value = ""
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Value can't be blank"
  end

  def test_options_value_should_not_be_blank
    @question.options.each do |option|
      option.value = ""
      assert_not option.valid?
      assert_includes option.errors.full_messages, "Value can't be blank"
    end
  end
end
