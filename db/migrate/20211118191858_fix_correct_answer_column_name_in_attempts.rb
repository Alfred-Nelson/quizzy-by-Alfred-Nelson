# frozen_string_literal: true

class FixCorrectAnswerColumnNameInAttempts < ActiveRecord::Migration[6.1]
  def change
    rename_column :attempts, :no_of_correct_answers, :correct_answer_count
  end
end
