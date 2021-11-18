# frozen_string_literal: true

class AddNoOfCorrectAnswerToAttempt < ActiveRecord::Migration[6.1]
  def change
    add_column :attempts, :no_of_correct_answers, :integer
  end
end
