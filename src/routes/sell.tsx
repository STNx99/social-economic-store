import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { CreateProductForm } from '@/components/product/CreateProductForm'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export const Route = createFileRoute('/sell')({
  component: SellPage,
})

function SellPage() {
  const { isAuthenticated, canCreateProduct, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ 
        to: '/auth/login', 
        search: { redirect: '/sell' } 
      })
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return null
  }

  if (!canCreateProduct) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6 px-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-destructive">
            Access Restricted
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Your account role ({user?.role}) is not authorized to list products for sale. 
            Please contact support if you believe this is an error.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate({ to: '/' })}>
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
          List Your Product
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Fill out the form below to add your product to our marketplace. 
          Make sure to provide clear images and a detailed description to attract more buyers.
        </p>
      </div>
      
      <div className="bg-background rounded-xl shadow-lg border p-1">
        <CreateProductForm 
          onSuccess={() => {
            // In a real app, we might redirect to the new product's page or a "My Products" page
            navigate({ to: '/' })
          }}
          onCancel={() => {
            navigate({ to: '/' })
          }}
        />
      </div>
    </div>
  )
}