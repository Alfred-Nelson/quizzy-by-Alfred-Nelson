# frozen_string_literal: true

require "test_helper"

class AttemptTest < ActiveSupport::TestCase
  def setup
    @user_a = User.create(
      email: "oliver@example.com",
      first_name: "oliver",
      last_name: "twist",
      password: "charles",
      password_confirmation: "charles",
      role: 1
    )
    @quiz_a = @user_a.quizzes.create(name: "hello")
    @question_a = @quiz_a.questions.create(
      value: "Who is this",
      options_attributes: [
        { value: "oliver", answer: false },
        { value: "sam", answer: true }
      ]
    )
    @participant_a = User.create(
      email: "pliver@example.com",
      first_name: "pliver",
      last_name: "twist",
      password: "charles",
      password_confirmation: "charles",
      role: 0
    )
    @attempt_a = Attempt.new(
      quiz_id: @quiz_a.id,
      user_id: @user_a.id,
      attempt_answers_attributes: [
        {
          question_id: @question_a.id,
          correct_answer_id: @question_a.options.first.id,
          marked_answer_id: @question_a.options.first.id
        }
      ]
    )
  end

  def test_attempts_should_be_valid
    assert @attempt_a.valid?
  end

  def test_attempt_answers_should_be_valid
    @attempt_a.attempt_answers.each do |attempt_answer|
      assert attempt_answer.valid?
    end
  end

  def test_submitted_has_default_value_false
    assert_equal @attempt_a.submitted, false
  end
end
