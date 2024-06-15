import generatedOtp from 'otp-generator';

export const useOtpGenerated = () => {
  return generatedOtp.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
};
