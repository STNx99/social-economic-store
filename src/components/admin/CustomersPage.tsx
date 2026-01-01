import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Search, UserPlus, Eye, Mail } from 'lucide-react'
import { useState } from 'react'
import { mockUsers } from '@/data/mock/users'

export function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const customers = mockUsers.filter(user => user.role === 'customer')

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Quản lý khách hàng</h2>
            <p className="text-muted-foreground">
              Xem và quản lý thông tin khách hàng
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Thêm khách hàng
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm khách hàng mới</DialogTitle>
                <DialogDescription>
                  Nhập thông tin khách hàng để thêm vào hệ thống
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Họ và tên</label>
                  <Input placeholder="Nhập họ và tên" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="example@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Số điện thoại</label>
                  <Input type="tel" placeholder="0123456789" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Địa chỉ</label>
                  <Input placeholder="Nhập địa chỉ" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Hủy</Button>
                <Button>Thêm khách hàng</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tổng khách hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
              <p className="text-xs text-muted-foreground">
                Khách hàng đã đăng ký
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Khách hàng mới</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {customers.filter(c => {
                  const createdDate = new Date(c.createdAt)
                  const thirtyDaysAgo = new Date()
                  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                  return createdDate >= thirtyDaysAgo
                }).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Trong 30 ngày qua
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Khách hàng VIP</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">24</div>
              <p className="text-xs text-muted-foreground">
                Mua &gt;10 đơn hàng
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tỷ lệ quay lại</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">68%</div>
              <p className="text-xs text-muted-foreground">
                Khách hàng quay lại mua
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Danh sách khách hàng</CardTitle>
                <CardDescription>
                  Tổng cộng {filteredCustomers.length} khách hàng
                </CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm khách hàng..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Liên hệ</TableHead>
                  <TableHead>Đơn hàng</TableHead>
                  <TableHead>Tổng chi tiêu</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày tham gia</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {customer.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">ID: {customer.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>12 đơn</TableCell>
                    <TableCell>1,234,560₫</TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(customer.createdAt).toLocaleDateString('vi-VN')}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top 5 khách hàng VIP</CardTitle>
            <CardDescription>
              Khách hàng có tổng chi tiêu cao nhất
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers.slice(0, 5).map((customer, index) => (
                <div key={customer.id} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                  <Avatar>
                    <AvatarFallback>
                      {customer.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">{customer.email}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">2,456,789₫</div>
                    <div className="text-sm text-muted-foreground">15 đơn hàng</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
