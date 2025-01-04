const dummy=(blogs)=>{
    return 1
}

const totalLikes=(blogs)=>{
    if(blogs){
        const total=blogs.reduce((sum,item)=>{
            return sum+item.likes
        },0)
        return total
    }
    else{
        return 0
    }
}

const favoriteBlog=(blogs)=>{
    const favourite=blogs.reduce((max,blog)=>{
        return blog.likes>max.likes?blog:max
    })
    return favourite
}

module.exports={
    dummy,
    totalLikes,
    favoriteBlog,
}




