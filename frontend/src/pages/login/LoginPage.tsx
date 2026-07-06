import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginUserMutation } from "../../hooks/api/loginUserMutation";
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
  EyeOffIcon,
  ArrowRightIcon,
} from "../../shared/AuthComponents";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { mutate: login, isPending, error } = loginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    login(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          toast.success("Successfully signed in!");
          navigate("/");
        },
        onError: (err) => {
          toast.error(err.message || "Login failed. Please check your credentials.");
        }
      },
    );
  };

  return (
    <AuthLayout
      eyebrowText="Welcome back"
      heroTitle={
        <>
          Ready to <br />
          <span>save time</span>, <br />
          learn more.
        </>
      }
      heroSubtitle="Sign in to access your saved summaries, view history, and manage your account all in one place."
      topBannerText="Don't have an account?"
      topBannerButtonText="Sign up"
      topBannerButtonAction={() => navigate("/register")}
    >
      <S.FormCard>
        <S.FormTitle>Welcome back</S.FormTitle>
        <S.FormSubtitle>Sign in to your account</S.FormSubtitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <S.FormGroup>
            <S.Label htmlFor="login-email">Email</S.Label>
            <InputWrapper>
              <MailIcon />
              <TextInput
                id="login-email"
                type="email"
                placeholder="you@example.com"
                hasIcon
                {...register("email")}
              />
            </InputWrapper>
            {errors.email && <S.FieldError>{errors.email.message}</S.FieldError>}
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="login-password">Password</S.Label>
            <InputWrapper>
              <LockIcon />
              <TextInput
                id="login-password"
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

          <S.FormActions style={{ justifyContent: "flex-end" }}>
            <ButtonTextLink type="button">Forgot password?</ButtonTextLink>
          </S.FormActions>

          <ButtonPrimary type="submit" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
            {!isPending && <ArrowRightIcon />}
          </ButtonPrimary>

          <S.Divider>
            <span>or</span>
          </S.Divider>

          <S.FormFooter>
            Don't have an account?{" "}
            <ButtonTextLink type="button" onClick={() => navigate("/register")}>
              Sign up
            </ButtonTextLink>
          </S.FormFooter>
        </form>
      </S.FormCard>
    </AuthLayout>
  );
};
