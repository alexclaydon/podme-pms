# frozen_string_literal: true

require "jwt"

class JitsiTokenService
  attr_reader :payload

  def initialize(payload)
    @rsa_private = OpenSSL::PKey::RSA.new(Rails.application.secrets.jitsi[:private_key].to_s.gsub('\n', "\n"))
    @payload = payload
    @token = nil
  end

  def generate
    JWT.encode data, @rsa_private, "RS256", "kid": Rails.application.secrets.jitsi[:kid], "typ": "JWT"
  end

  def data
    present_time = Time.now.to_i
    {
      aud: "jitsi",
      context: {
        user: payload,
        features: {
          livestreaming: "true",
          recording: "true",
          transcription: "true",
          "outbound-call": "true",
        },
      },
      iss: "chat",
      room: "*",
      sub: Rails.application.secrets.jitsi[:application_id],
      exp: present_time + 2.hours.to_i,
      nbf: present_time,
    }
  end
end
