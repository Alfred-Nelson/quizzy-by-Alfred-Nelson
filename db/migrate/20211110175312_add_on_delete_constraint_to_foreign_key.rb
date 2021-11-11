# frozen_string_literal: true

class AddOnDeleteConstraintToForeignKey < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :options, :questions
    remove_foreign_key :questions, :quizzes
    add_foreign_key :questions, :quizzes, on_delete: :cascade
    add_foreign_key :options, :questions, column: :questions_id, on_delete: :cascade
  end
end
