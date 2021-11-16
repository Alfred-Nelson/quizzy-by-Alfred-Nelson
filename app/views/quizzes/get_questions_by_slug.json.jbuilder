json.quiz do
  json.extract! @quiz, :id
  json.questions @quiz.questions do |question|
    json.extract! question, :value
    json.options question.options do |option|
      json.extract! option, :value
    end
  end
end