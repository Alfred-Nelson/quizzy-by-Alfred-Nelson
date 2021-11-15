# frozen_string_literal: true

json.quiz do
  json.extract! @quiz, :id, :name, :slug
  json.questions @quiz.questions do |question|
    json.extract! question, :id, :value
    json.options question.options do |option|
      json.extract! option, :id, :value, :answer
    end
  end
end
