# frozen_string_literal: true

json.attempt do
  json.extract! @attempt, :correct_answer_count
  json.attempted @attempt.attempt_answers do |question|
    json.extract! question, :question_id, :marked_answer_id, :correct_answer_id
  end
end
