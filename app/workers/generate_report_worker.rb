# frozen_string_literal: true

class GenerateReportWorker
  include Sidekiq::Worker
  include Sidekiq::Status::Worker

  def perform(user_id)
    count = 0
    attempts = []
    user = User.find_by(id: user_id)
    user.quizzes.each do |quiz|
      quiz.attempts.each do |attempt|
        attempts.push(
          [
            attempt.quiz.name,
            "#{attempt.user.first_name.capitalize} #{attempt.user.last_name.capitalize}",
            attempt.user.email,
            attempt.correct_answer_count.to_s,
            attempt.incorrect_answer_count.to_s
          ]
        )
      end
    end
    puts attempts
    total attempts.size
    attributes = %w[quiz_name user_name email correct_answer incorrect_answer]
    CSV.open(Rails.root.join("tmp", "report_#{user_id}.csv"), "wb") do |csv|
      csv << attributes
      attempts.each.with_index(1) do |attempt, index|
        at index
        csv << attempt
        sleep 1
      end
    end
  end
end
