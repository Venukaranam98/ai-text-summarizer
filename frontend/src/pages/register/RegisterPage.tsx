import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { registerUserMutation } from "../../hooks/api/registerUserMutation";
import { AuthLayout } from "../../shared/AuthLayout";
import * as S from '../../shared/AuthComponnets.styles';
import {
  InputWrapper,
  TextInput,
  ButtonPrimary,
  ButtonTextLink,
} from "../../app/App.styles";
import {
  MailIcon,
  LockIcon,
  UserIcon,
  EyeOffIcon,
  ArrowRightIcon,
} from "../../shared/AuthComponents";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { mutate: registerMutation, isPending, error } = registerUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          toast.success("Account created successfully! Please sign in.");
          navigate("/login");
        },
        onError: (err) => {
          toast.error(err.message || "Registration failed. Please try again.");
        }
      },
    );
  };

  return (
    <AuthLayout
      eyebrowText="Join us today"
      heroTitle={
        <>
          Ready to <br />
          <span>save time</span>, <br />
          learn more.
        </>
      }
      heroSubtitle="Create an account to quickly summarize long articles, papers, and documents to unlock your productivity."
      topBannerText="Already have an account?"
      topBannerButtonText="Sign in"
      topBannerButtonAction={() => navigate("/login")}
    >
      <S.FormCard>
        <S.FormTitle>Create an account</S.FormTitle>
        <S.FormSubtitle>Start summarizing in seconds</S.FormSubtitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <S.FormGroup>
            <S.Label htmlFor="register-name">Full Name</S.Label>
            <InputWrapper>
              <UserIcon />
              <TextInput
                id="register-name"
                type="text"
                placeholder="Ex. Jane Doe"
                hasIcon
                {...register("fullName")}
              />
            </InputWrapper>
            {errors.fullName && <S.FieldError>{errors.fullName.message}</S.FieldError>}
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="register-email">Email</S.Label>
            <InputWrapper>
              <MailIcon />
              <TextInput
                id="register-email"
                type="email"
                placeholder="you@example.com"
                hasIcon
                {...register("email")}
              />
            </InputWrapper>
            {errors.email && <S.FieldError>{errors.email.message}</S.FieldError>}
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="register-password">Password</S.Label>
            <InputWrapper>
              <LockIcon />
              <TextInput
                id="register-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                hasIcon
                hasRightIcon
                {...register("password")}
              />
              <div onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
                <EyeOffIcon />
              </div>
            </InputWrapper>
            {errors.password && <S.FieldError>{errors.password.message}</S.FieldError>}
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="register-confirm-password">Confirm Password</S.Label>
            <InputWrapper>
              <LockIcon />
              <TextInput
                id="register-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                hasIcon
                hasRightIcon
                {...register("confirmPassword")}
              />
              <div onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: "pointer" }}>
                <EyeOffIcon />
              </div>
            </InputWrapper>
            {errors.confirmPassword && <S.FieldError>{errors.confirmPassword.message}</S.FieldError>}
          </S.FormGroup>

          <S.FormActions>
            <ButtonPrimary type="submit" disabled={isPending}>
              {isPending ? "Creating account..." : "Sign up"}
              {!isPending && <ArrowRightIcon />}
            </ButtonPrimary>
          </S.FormActions>

          <S.Divider>
            <span>or</span>
          </S.Divider>

          <S.FormFooter>
            Already have an account?{" "}
            <ButtonTextLink type="button" onClick={() => navigate("/login")}>
              Sign in
            </ButtonTextLink>
          </S.FormFooter>
        </form>
      </S.FormCard>
    </AuthLayout>
  );
};
