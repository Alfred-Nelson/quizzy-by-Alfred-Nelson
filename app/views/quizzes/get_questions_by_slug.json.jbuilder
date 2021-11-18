# frozen_string_literal: true

json.quiz do
  json.extract! @quiz, :id
  json.questions @quiz.questions do |question|
    json.extract! question, :value, :id
    json.options question.options do |option|
      json.extract! option, :value, :id
    end
  end
end
