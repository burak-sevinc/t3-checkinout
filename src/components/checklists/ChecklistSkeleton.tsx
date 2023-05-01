import { Skeleton } from "@mantine/core";
export default function ChecklistSkeleton() {
  return (
    <div
      style={{
        padding: "1rem",
      }}
    >
      <Skeleton height={24} radius="lg" mb="xl" />
      <Skeleton height={12} radius="xl" />
      <Skeleton height={12} mt={6} radius="xl" />
      <Skeleton height={12} mt={6} radius="xl" />
      <Skeleton height={12} mt={6} radius="xl" />
      <Skeleton height={12} mt={6} radius="xl" />
      <Skeleton height={12} mt={6} radius="xl" />
      <Skeleton height={12} mt={6} radius="xl" />
      <Skeleton height={24} mt={12} radius="sm" />
    </div>
  );
}
