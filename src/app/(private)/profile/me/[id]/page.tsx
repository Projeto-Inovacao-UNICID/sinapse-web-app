interface UserProfileProps {
  params: {
    id: string
  }
}

export default function UserProfile ({ params }: UserProfileProps) {
  return <div>User Profile</div>
}