# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      email: "oliver@example.com",
      first_name: "oliver",
      last_name: "twist",
      password: "charles",
      password_confirmation: "charles"
                )
  end

  # embed new test cases here...
  def test_user_valid
    assert @user.valid?
  end

  def test_first_name_should_be_present
    @user.first_name = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "First name can't be blank"
  end

  def test_last_name_should_be_present
    @user.last_name = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Last name can't be blank"
  end

  def test_email_should_be_present
    @user.email = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Email can't be blank"
  end

  def test_first_name_length_should_be_valid
    @user.first_name = "a" * 51
    assert_not @user.valid?
  end

  def test_last_name_length_should_be_valid
    @user.last_name = "a" * 51
    assert_not @user.valid?
  end

  def test_email_should_be_unique
    @user.save!
    some_user = @user.dup
    assert_not some_user.valid?
    assert_includes some_user.errors.full_messages, "Email has already been taken"
  end

  def test_upcase_email_should_not_be_saved_when_downcase_is_already_present
    some_user = @user.dup
    some_user.email = "OLIVER@example.com"
    some_user.save!
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Email has already been taken"
  end

  def test_email_should_be_lowercase
    @user.email = @user.email.upcase!
    assert @user.valid?
    assert_equal @user.email, @user.email.downcase!
  end

  def test_email_address_should_reject_valid_address
    invalid_emails = %w[user@example,com user_at_example.org user.name@example. @sam-sam.com sam@sam+exam.com
fishy+#.com]
    invalid_emails.each do |email|
      @user.email = email
      assert @user.invalid?
    end
  end

  def test_email_address_should_accept_valid_address
    valid_emails = %w[user@example.com USER@example.COM US-ER@example.org first.last@example.in user+one@example.ac.in]
    valid_emails.each do |email|
      @user.email = email
      assert @user.valid?
    end
  end

  def test_user_should_have_valid_role
    all_roles = %w[administrator standard]
    all_roles.each do |role|
      @user.role = role
      assert @user.valid?
    end
  end

  def test_password_cant_be_blank
    @user.password = nil
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Password can't be blank"
  end

  def test_password_should_have_minimum_length
    @user.password = "aaaaa"
    @user.password_confirmation = "aaaaa"
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Password is too short (minimum is 6 characters)"
  end

  def test_password_confirmation_should_have_minimum_length
    @user.password_confirmation = "aaaaa"
    @user.password = "aaaaa"
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Password confirmation is too short (minimum is 6 characters)"
  end

  def test_password_should_match_password_confirmation
    @user.password_confirmation = @user.password + "_random"
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Password confirmation doesn't match Password"
  end
end
