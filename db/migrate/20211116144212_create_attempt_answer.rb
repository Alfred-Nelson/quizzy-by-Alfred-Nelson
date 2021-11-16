# frozen_string_literal: true

class CreateAttemptAnswer < ActiveRecord::Migration[6.1]
  def change
    create_table :attempt_answers do |t|
      t.references :attempt, null: false, foreign_key: true
      t.references :question, null: false, foreign_key: true
      t.references :correct_answer, null: false, foreign_key: { to_table: "options" }
      t.references :marked_answer, null: false, foreign_key: { to_table: "options" }
      t.timestamps
    end
  end
end
