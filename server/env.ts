import * as z from 'zod';

const envSchema = z.object({
  ATLAS_URI: z.string(),
  PORT: z.string(),
  NODE_ENV: z.string(),
  JWT_SECRET: z.string(),
  ALPHA_VANTAGE_KEY: z.string(),
});

type EnvType = z.infer<typeof envSchema>;

const validateEnv = (config: Record<string, unknown>): EnvType => {
  return envSchema.parse(config);
};

const env = {
  ATLAS_URI: process.env.ATLAS_URI!,
  PORT: process.env.PORT!,
  NODE_ENV: process.env.NODE_ENV!,
  JWT_SECRET: process.env.JWT_SECRET!,
  ALPHA_VANTAGE_KEY: process.env.ALPHA_VANTAGE_KEY!,
};

export { env, validateEnv };
