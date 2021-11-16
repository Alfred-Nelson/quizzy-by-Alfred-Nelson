# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_11_16_144212) do

  create_table "attempt_answers", force: :cascade do |t|
    t.integer "attempt_id", null: false
    t.integer "question_id", null: false
    t.integer "correct_answer_id", null: false
    t.integer "marked_answer_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["attempt_id"], name: "index_attempt_answers_on_attempt_id"
    t.index ["correct_answer_id"], name: "index_attempt_answers_on_correct_answer_id"
    t.index ["marked_answer_id"], name: "index_attempt_answers_on_marked_answer_id"
    t.index ["question_id"], name: "index_attempt_answers_on_question_id"
  end

  create_table "attempts", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "quiz_id", null: false
    t.boolean "submitted", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["quiz_id"], name: "index_attempts_on_quiz_id"
    t.index ["user_id"], name: "index_attempts_on_user_id"
  end

  create_table "options", force: :cascade do |t|
    t.text "value", null: false
    t.boolean "answer", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "question_id"
    t.index ["question_id"], name: "index_options_on_question_id"
  end

  create_table "questions", force: :cascade do |t|
    t.text "value", null: false
    t.integer "quiz_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["quiz_id"], name: "index_questions_on_quiz_id"
  end

  create_table "quizzes", force: :cascade do |t|
    t.text "name", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "slug"
    t.index ["slug"], name: "index_quizzes_on_slug", unique: true
    t.index ["user_id"], name: "index_quizzes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.text "email", null: false
    t.text "first_name", null: false
    t.text "last_name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "role", default: 0, null: false
    t.string "password_digest", null: false
    t.string "authentication_token"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "attempt_answers", "attempts"
  add_foreign_key "attempt_answers", "options", column: "correct_answer_id"
  add_foreign_key "attempt_answers", "options", column: "marked_answer_id"
  add_foreign_key "attempt_answers", "questions"
  add_foreign_key "attempts", "quizzes"
  add_foreign_key "attempts", "users"
  add_foreign_key "options", "questions"
  add_foreign_key "questions", "quizzes", on_delete: :cascade
  add_foreign_key "quizzes", "users"
end
