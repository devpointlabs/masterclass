require 'test_helper'

class Api::EnrollmentsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_enrollments_index_url
    assert_response :success
  end

  test "should get show" do
    get api_enrollments_show_url
    assert_response :success
  end

  test "should get create" do
    get api_enrollments_create_url
    assert_response :success
  end

  test "should get update" do
    get api_enrollments_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_enrollments_destroy_url
    assert_response :success
  end

end
