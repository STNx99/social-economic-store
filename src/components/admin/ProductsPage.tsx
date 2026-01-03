import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Search, Edit, Trash2, Eye, Loader2 } from 'lucide-react'
import { useState, useMemo, useEffect, useDeferredValue } from 'react'
import { useProducts } from '@/hooks/useProducts'
import { useToast } from '@/contexts/ToastContext'

export function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const deferredSearchQuery = useDeferredValue(searchQuery)
  
  const { showToast } = useToast()
  const { data: productsData, isLoading, error } = useProducts()
  
  const products = productsData?.data || []
  
  const filteredProducts = useMemo(() => 
    products.filter(product =>
      product.name.toLowerCase().includes(deferredSearchQuery.toLowerCase()) ||
      (product.category?.toLowerCase().includes(deferredSearchQuery.toLowerCase()) ?? false)
    ),
    [products, deferredSearchQuery]
  )
  
  const statistics = useMemo(() => {
    const lowStockCount = products.filter(p => {
      const total = p.variants 
        ? p.variants.reduce((sum, v) => sum + v.stock, 0)
        : p.stock
      return total > 0 && total <= 20
    }).length
    
    const outOfStockCount = products.filter(p => {
      const total = p.variants 
        ? p.variants.reduce((sum, v) => sum + v.stock, 0)
        : p.stock
      return total === 0
    }).length
    
    return {
      total: products.length,
      lowStock: lowStockCount,
      outOfStock: outOfStockCount
    }
  }, [products])
  
  useEffect(() => {
    if (error) {
      showToast({
        title: 'Lỗi',
        description: 'Không thể tải danh sách sản phẩm',
        variant: 'error',
      })
    }
  }, [error, showToast])

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Quản lý sản phẩm</h2>
            <p className="text-muted-foreground">
              Quản lý danh sách sản phẩm, giá cả và tồn kho
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Thêm sản phẩm
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Danh sách sản phẩm</CardTitle>
                <CardDescription>
                  {isLoading ? 'Đang tải...' : `Tổng cộng ${filteredProducts.length} sản phẩm${searchQuery !== deferredSearchQuery ? ' (đang tìm kiếm...)' : ''}`}
                </CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {searchQuery ? 'Không tìm thấy sản phẩm nào' : 'Chưa có sản phẩm nào'}
              </div>
            ) : (
              <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hình ảnh</TableHead>
                  <TableHead>Tên sản phẩm</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Giá</TableHead>
                  <TableHead>Tồn kho</TableHead>
                  <TableHead>Đánh giá</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const totalStock = product.variants 
                    ? product.variants.reduce((sum, variant) => sum + variant.stock, 0)
                    : product.stock
                  
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={product.images[0] || 'https://via.placeholder.com/150'}
                          alt={product.name}
                          className="h-12 w-12 rounded object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category || 'N/A'}</TableCell>
                      <TableCell>{product.price.toLocaleString('vi-VN')}₫</TableCell>
                      <TableCell>
                        <Badge variant={totalStock > 50 ? 'default' : totalStock > 0 ? 'secondary' : 'destructive'}>
                          {totalStock} sp
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span>{product.rating || 0}</span>
                          <span className="text-muted-foreground">({product.reviewCount || 0})</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                          {product.status === 'active' ? 'Hoạt động' : product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            title="Xem chi tiết"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            title="Chỉnh sửa"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            title="Xóa"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Tổng sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : statistics.total}
              </div>
              <p className="text-xs text-muted-foreground">
                Sản phẩm trong hệ thống
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Sắp hết hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : statistics.lowStock}
              </div>
              <p className="text-xs text-muted-foreground">
                Sản phẩm cần nhập thêm
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Hết hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : statistics.outOfStock}
              </div>
              <p className="text-xs text-muted-foreground">
                Sản phẩm không có hàng
              </p>
            </CardContent>
          </Card>
        </div>
    </div>
  )
}