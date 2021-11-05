# frozen_string_literal: true

class RemoveNameIndexFromQuiz < ActiveRecord::Migration[6.1]
  def change
    remove_index :quizzes, :name
  end
end
